export default class LockObject {
    private _lock: boolean = false;

    public async lock(): Promise<boolean> {
        const result = this._lock;
        if (!this._lock)
            this._lock = true;
        else
            await this.waitToUnlock();
        return result;
    }

    public unlock() {
        this._lock = false;
    }

    private async waitToUnlock() {
        await this.waitFor(500);
        if (this._lock)
            await this.waitToUnlock();
    }

    private waitFor(milliseconds: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, milliseconds)
        })
    }
}