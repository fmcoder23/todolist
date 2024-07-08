const fs = require('fs/promises');

class Io {
    #dir;

    constructor(dir) {
        this.#dir = dir;
    }

    async read() {
        const data = await fs.readFile(this.#dir, 'utf-8');
        const result = data ? JSON.parse(data) : [];

        return result;
    }

    async write(data) {
        await fs.writeFile(this.#dir, JSON.stringify(data, null, 2), 'utf-8');
    }
}

module.exports = Io;