// ==========================================
// tryCPP - Simple C++ Simulator
// Support: komentar //, /* */, string-aware, HTML entities, cin/cout, if/else, while, for
// ==========================================

class SimpleCpp {
    constructor() {
        this.vars = {};
        this.varTypes = {};
        this.arrays = {};
        this.output = "";
        this.stopFlag = false;
    }

    reset() {
        this.vars = {};
        this.varTypes = {};
        this.arrays = {};
        this.output = "";
        this.stopFlag = false;
    }

    stop() {
        this.stopFlag = true;
    }

    async execute(code) {
        this.reset();
        // Decode HTML entities yang datang dari TutorialCPP (innerText)
        code = this.decodeHtmlEntities(code);
        // Hapus komentar blok /* ... */ sebelum parsing
        code = this.stripBlockComments(code);
        const mainBody = this.extractMain(code);
        if (mainBody === null) {
            this.print("Error: 'int main()' tidak ditemukan.\nPastikan kode memiliki fungsi int main() { ... }\n");
            return this.output;
        }
        const lines = mainBody.split('\n').map(l => l.trimRight());
        await this.runBlock(lines);
        return this.output;
    }

    // Decode HTML entities (dari innerText elemen di TutorialCPP)
    decodeHtmlEntities(str) {
        return str
            .replace(/&lt;/g,  '<')
            .replace(/&gt;/g,  '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g,'"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g,' ');
    }

    // Hapus komentar blok /* ... */ (string-safe)
    stripBlockComments(code) {
        let result = '';
        let i = 0;
        while (i < code.length) {
            // Lewati string literal agar /* di dalam string tidak terhapus
            if (code[i] === '"') {
                result += code[i++];
                while (i < code.length) {
                    if (code[i] === '\\') { result += code[i++]; if (i < code.length) result += code[i++]; }
                    else if (code[i] === '"') { result += code[i++]; break; }
                    else result += code[i++];
                }
            } else if (code[i] === '/' && code[i+1] === '*') {
                let end = code.indexOf('*/', i + 2);
                i = (end === -1) ? code.length : end + 2;
            } else {
                result += code[i++];
            }
        }
        return result;
    }

    extractMain(code) {
        // Hapus preprocessor directives
        let clean = code.replace(/^\s*#[^\n]*/gm, '');
        clean = clean.replace(/using\s+namespace\s+std\s*;/g, '');

        // Regex fleksibel: ambil isi int main() hingga penutup kurawal terakhir
        const regex = /int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/;
        let match = clean.match(regex);


        return match ? match[1] : null;
    }

    // Hapus komentar // dari sebuah baris, tapi HANYA jika // bukan di dalam string literal
    stripLineComment(line) {
        let inString = false;
        let i = 0;
        while (i < line.length) {
            const ch = line[i];
            // Masuk/keluar string literal
            if (ch === '"' && (i === 0 || line[i-1] !== '\\')) {
                inString = !inString;
                i++;
                continue;
            }
            // Jika menemukan // di luar string → potong di sini
            if (!inString && ch === '/' && line[i+1] === '/') {
                return line.substring(0, i).trim();
            }
            i++;
        }
        return line.trim();
    }

    convertByType(value, type) {
        if (type === 'int') {
            let num = Number(value);
            return isNaN(num) ? 0 : Math.floor(num);
        }
        return value;
    }

    async runBlock(lines, startIdx = 0) {
        let i = startIdx;
        while (i < lines.length) {
            if (this.stopFlag) {
                this.print("\n[Execution stopped by user]\n");
                return;
            }
            let line = lines[i].trim();
            if (line === "") { i++; continue; }

            // Hapus komentar // yang TIDAK ada di dalam string literal
            line = this.stripLineComment(line);
            if (line === "") { i++; continue; }

            let declMatch = line.match(/^(int|string)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(=\s*(.+))?;$/);
            if (declMatch) {
                let type = declMatch[1];
                let name = declMatch[2];
                let expr = declMatch[4];
                let val;
                if (expr !== undefined) {
                    val = this.evalExpr(expr);
                } else {
                    val = (type === "int") ? 0 : "";
                }
                this.varTypes[name] = type;
                this.vars[name] = this.convertByType(val, type);
                i++;
                continue;
            }

            let arrDecl = line.match(/^(int|string)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\[\s*(\d+)\s*\]\s*;$/);
            if (arrDecl) {
                let type = arrDecl[1];
                let name = arrDecl[2];
                let size = parseInt(arrDecl[3]);
                let arr = new Array(size);
                arr.fill(type === "int" ? 0 : "");
                this.arrays[name] = arr;
                i++;
                continue;
            }

            let assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+);$/);
            if (assignMatch && !line.includes('[')) {
                let varName = assignMatch[1];
                let expr = assignMatch[2];
                let val = this.evalExpr(expr);
                let type = this.varTypes[varName] || 'int';
                this.vars[varName] = this.convertByType(val, type);
                i++;
                continue;
            }

            let arrAssign = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\[\s*(.+?)\s*\]\s*=\s*(.+);$/);
            if (arrAssign) {
                let arrName = arrAssign[1];
                let idxExpr = arrAssign[2];
                let valExpr = arrAssign[3];
                let idx = this.evalExpr(idxExpr);
                let val = this.evalExpr(valExpr);
                if (this.arrays[arrName] && idx >= 0 && idx < this.arrays[arrName].length) {
                    this.arrays[arrName][idx] = val;
                } else {
                    this.print(`Error: array index out of bounds\n`);
                }
                i++;
                continue;
            }

            if (line.startsWith("cout")) {
                this.print(this.parseCout(line));
                i++;
                continue;
            }

            if (line.startsWith("cin")) {
                await this.parseCin(line);
                i++;
                continue;
            }

            if (line.startsWith("if")) {
                let condMatch = line.match(/if\s*\((.+)\)\s*\{?/);
                if (condMatch) {
                    let condTrue = this.evalCondition(condMatch[1]);
                    let hasBrace = line.includes("{");
                    if (hasBrace) {
                        let block = this.extractBlock(lines, i);
                        if (condTrue) await this.runBlock(block);
                        i += block.length + 2;
                        let nextIdx = i;
                        while (nextIdx < lines.length && lines[nextIdx].trim() === "") nextIdx++;
                        if (nextIdx < lines.length && lines[nextIdx].trim().startsWith("else")) {
                            let elseBlock = this.extractBlock(lines, nextIdx);
                            if (!condTrue) await this.runBlock(elseBlock);
                            i = nextIdx + elseBlock.length + 2;
                        }
                        continue;
                    } else {
                        let nextLine = lines[i+1];
                        if (condTrue) await this.runBlock([nextLine]);
                        i += 2;
                        continue;
                    }
                }
                i++;
                continue;
            }

            if (line.startsWith("while")) {
                let whileMatch = line.match(/while\s*\((.+)\)\s*\{?/);
                if (whileMatch) {
                    let cond = whileMatch[1];
                    let block = this.extractBlock(lines, i);
                    let maxIter = 10000;
                    while (this.evalCondition(cond) && maxIter-- > 0 && !this.stopFlag) {
                        await this.runBlock([...block]);
                    }
                    i += block.length + 2;
                    continue;
                }
                i++;
                continue;
            }

            if (line.startsWith("for")) {
                let forMatch = line.match(/for\s*\(([^;]+);([^;]+);([^)]+)\)\s*\{?/);
                if (forMatch) {
                    let init = forMatch[1].trim();
                    let cond = forMatch[2].trim();
                    let inc = forMatch[3].trim();
                    let block = this.extractBlock(lines, i);
                    if (init) await this.runBlock([init + ";"]);
                    let maxLoop = 10000;
                    while (this.evalCondition(cond) && maxLoop-- > 0 && !this.stopFlag) {
                        await this.runBlock([...block]);
                        if (inc) await this.runBlock([inc + ";"]);
                    }
                    i += block.length + 2;
                    continue;
                }
                i++;
                continue;
            }

            i++;
        }
    }

    evalExpr(expr) {
        expr = expr.trim();
        if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);
        if (!isNaN(expr)) return Number(expr);
        if (this.vars[expr] !== undefined) return this.vars[expr];

        let arrMatch = expr.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(.+)\]$/);
        if (arrMatch) {
            let name = arrMatch[1];
            let idx = this.evalExpr(arrMatch[2]);
            if (this.arrays[name] && idx >= 0 && idx < this.arrays[name].length)
                return this.arrays[name][idx];
            return 0;
        }

        let tokens = expr.split(/([+\-*/])/);
        if (tokens.length === 1) return this.evalAtom(tokens[0]);
        let result = this.evalAtom(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            let op = tokens[i];
            let right = this.evalAtom(tokens[i+1]);
            if (op === '+') result += right;
            else if (op === '-') result -= right;
            else if (op === '*') result *= right;
            else if (op === '/') result = right !== 0 ? result / right : 0;
        }
        return result;
    }

    evalAtom(atom) {
        atom = atom.trim();
        if (!isNaN(atom)) return Number(atom);
        if (this.vars[atom] !== undefined) return this.vars[atom];
        let arrMatch = atom.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(\d+)\]$/);
        if (arrMatch && this.arrays[arrMatch[1]]) {
            let idx = parseInt(arrMatch[2]);
            return this.arrays[arrMatch[1]][idx] ?? 0;
        }
        return 0;
    }

    evalCondition(cond) {
        let ops = ["==", "!=", "<=", ">=", "<", ">"];
        for (let op of ops) {
            let idx = cond.indexOf(op);
            if (idx !== -1) {
                let left = cond.slice(0, idx).trim();
                let right = cond.slice(idx + op.length).trim();
                let lval = this.evalExpr(left);
                let rval = this.evalExpr(right);
                switch(op) {
                    case "==": return lval == rval;
                    case "!=": return lval != rval;
                    case "<=": return lval <= rval;
                    case ">=": return lval >= rval;
                    case "<": return lval < rval;
                    case ">": return lval > rval;
                }
            }
        }
        return Boolean(this.evalExpr(cond));
    }

    parseCout(line) {
        let result = "";
        // Hapus cout << di depan dan ; di belakang
        let content = line.replace(/^cout\s*<<\s*/, "").replace(/\s*;$/, "");

        // Split berdasarkan << tapi tidak di dalam string literal
        let parts = this.splitByOperator(content, "<<");

        for (let part of parts) {
            part = part.trim();
            if (part === "endl" || part === "\"\\n\"") {
                result += "\n";
            } else if (part.startsWith('"') && part.endsWith('"')) {
                // Proses escape sequences di dalam string
                let inner = part.slice(1, -1);
                inner = inner
                    .replace(/\\n/g, "\n")
                    .replace(/\\t/g, "\t")
                    .replace(/\\\\/g, "\\")
                    .replace(/\\"/g, '"');
                result += inner;
            } else if (this.vars[part] !== undefined) {
                result += this.vars[part];
            } else if (this.arrays[part]) {
                result += this.arrays[part].join(" ");
            } else {
                let val = this.evalExpr(part);
                result += val;
            }
        }
        return result;
    }

    // Split string berdasarkan operator (mis. <<) tapi tidak memotong di dalam string literal
    splitByOperator(str, op) {
        let parts = [];
        let current = "";
        let inString = false;
        let i = 0;
        while (i < str.length) {
            if (str[i] === '"' && (i === 0 || str[i-1] !== '\\')) {
                inString = !inString;
                current += str[i++];
            } else if (!inString && str.slice(i, i + op.length) === op) {
                parts.push(current);
                current = "";
                i += op.length;
            } else {
                current += str[i++];
            }
        }
        if (current.trim()) parts.push(current);
        return parts;
    }


    async parseCin(line) {
        let matches = line.match(/cin\s*>>\s*([a-zA-Z_][a-zA-Z0-9_]*)/g);
        if (!matches) return;
        let vars = matches.map(m => m.replace(/cin\s*>>\s*/, "").trim());
        for (let v of vars) {
            let val = await this.getUserInput(v);
            if (!isNaN(val) && val !== "") val = Number(val);
            let type = this.varTypes[v] || 'int';
            this.vars[v] = this.convertByType(val, type);
        }
    }

    getUserInput(varName) {
        return new Promise(resolve => {
            let input = prompt(`Enter value for "${varName}":`);
            resolve(input !== null ? input : "");
        });
    }

    print(msg) {
        this.output += msg;
    }

    extractBlock(lines, startIdx) {
        let braceCount = 0;
        let started = false;
        let block = [];
        for (let i = startIdx; i < lines.length; i++) {
            let line = lines[i];
            for (let ch of line) {
                if (ch === '{') { braceCount++; started = true; }
                else if (ch === '}') braceCount--;
            }
            if (started && braceCount === 0 && line.includes('}')) break;
            if (started && i !== startIdx) block.push(line);
        }
        return block;
    }
}

// ========== UI ==========
document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("cppEditor");
    const outputPre = document.getElementById("cppOutput");
    const runBtn = document.getElementById("runCpp");
    const stopBtn = document.getElementById("stopCpp");
    const statusSpan = document.getElementById("runStatus");

    const defaultCode = `#include <iostream>
using namespace std;

int main() {
    // Ini adalah komentar
    cout << "Selamat datang di Alat Tes untuk C++" << endl;
    cout << "Masukkan sebuah angka: ";
    int x;
    cin >> x;  // komentar di akhir baris
    cout << "Angka yang Anda masukkan: " << x << endl;
    return 0;
}
`;
    editor.value = defaultCode;
    outputPre.textContent = "";

    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    if (codeParam) {
        try {
            const decodedCode = decodeURIComponent(codeParam);
            editor.value = decodedCode;
        } catch(e) { console.error(e); }
    }

    let currentSim = null;

    runBtn.addEventListener("click", async () => {
        if (currentSim) {
            currentSim.stop();
            await new Promise(r => setTimeout(r, 30));
        }
        outputPre.textContent = "";
        statusSpan.textContent = "● Running...";
        statusSpan.style.color = "#f9c74f";

        const sim = new SimpleCpp();
        currentSim = sim;
        try {
            const output = await sim.execute(editor.value);
            outputPre.textContent = output;
            if (sim.stopFlag) {
                statusSpan.textContent = "● Stopped (output cleared)";
                statusSpan.style.color = "#f94144";
            } else {
                statusSpan.textContent = "● Finished";
                statusSpan.style.color = "#90be6d";
            }
        } catch (err) {
            console.error(err);
            outputPre.textContent = `Error: ${err.message}`;
            statusSpan.textContent = "● Error";
            statusSpan.style.color = "#f94144";
        } finally {
            if (currentSim === sim) currentSim = null;
        }
    });

    stopBtn.addEventListener("click", () => {
        if (currentSim) {
            currentSim.stop();
            outputPre.textContent = "";
            statusSpan.textContent = "● Stopped - Output cleared";
            statusSpan.style.color = "#f9844a";
        } else {
            outputPre.textContent = "";
            statusSpan.textContent = "● Output cleared";
            setTimeout(() => {
                if (statusSpan.textContent === "● Output cleared") statusSpan.textContent = "● Ready";
            }, 1500);
        }
    });
});