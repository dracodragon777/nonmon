class Vector {
    protected _components: number[]
    constructor(components: number[]) {
        this._components = components;
    }
    get components(): number[] {
        return this._components;
    }
    add(other: Vector) {
        return new Vector(other.components.map((component, index) => this.components[index] + component))
    }
    subtract(other: Vector) {
        return new Vector(other.components.map((component, index) => this.components[index] + component))
    }
    set(components: number[]) {
        this._components = components;
        return this;
    }
    scalar(scale: number): number {
        return new Vector(this.components.map(component => component * scale));
    }
    length(): number {
        return Math.hypot(...this.components)
    }
    distanceTo(other: Vector): number {
        return this.components.map((component, index) => (other.components[index] - component) ** 2).reduce((acc, current) => acc += current) ** 0.5;
    }
    public dotProduct(other: Vector) {
        return other.components.reduce((acc, component, index) => acc + component * this.components[index], 0);
    }
    public negate(): Vector {
        return this.scalar(-1);
    }
    public normalize(): Vector {
        return this.scalar(1 / this.length());
    }
    public haveSameDirectionWith(other: Vector): boolean {
        return this.normalize().dotProduct(other.normalize()) === 1;
    }
    public haveOppositeDirectionTo(other: Vector): boolean {
        return this.normalize().dotProduct(other.normalize()) === -1;
    }
    public isPerpendicularTo(other: Vector): boolean {
        return this.normalize().dotProduct(other.normalize()) === 0;
    }
    public angleBetween(other: Vector): number {
        return ((Math.acos(this.dotProduct(other) / (this.length() * other.length()))) * 180) / Math.PI;
    }
    public projectOn(other: Vector): Vector {
        const normalized = other.normalize();
        return normalized.scalar(this.dotProduct(normalized));
    }
    public withLength(length: number): Vector {
        return this.normalize().scalar(length);
    }
    public equalTo(other: Vector): boolean {
        if (this.components.length != other.components.length) return false;
        return this.components.every((component, index) => component === other.components[index]);
    }
    public midpoint(other: Vector): Vector {
        return new Vector(this.components.map((component, index) => (component + other.components[index]) / 2));
    }
    public distanceToSquared(other: Vector): number {
        return this.components.reduce((acc, component, index) => acc + (component - other.components[index]) ** 2, 0);
    }
    public toString(): string {
        let out = '[ '
        this.components.forEach(component => {
            if (component === this.components[this.components.length - 1]) out += `${component} ]`
            else out += `${component}, `
        })
        return out;
    }
}
