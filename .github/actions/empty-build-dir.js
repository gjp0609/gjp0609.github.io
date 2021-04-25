/**
 * vite 暂时不支持 build 时排除文件夹
 * 故手动删除然后设定 vite build.emptyOutDir: false，不删除文件
 */
const fs = require('fs');
const path = require('path');

function emptyDir(dir) {
    if (!fs.existsSync(dir)) {
        return;
    }
    for (const file of fs.readdirSync(dir)) {
        const abs = path.resolve(dir, file);
        fs.unlinkSync(abs);
    }
}

emptyDir('./static/assets');
