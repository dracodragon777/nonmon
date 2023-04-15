class Vector3 extends Vector {
    constructor(x: number, y: number, z: number) {
        super([x, y, z])
    }

    get x() { return this._components[0]; }
    get y() { return this._components[1]; }
    get z() { return this._components[2]; }

    public override add(other: Vector3): Vector3 {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    public override subtract(other: Vector3): Vector3 {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    public override scalar(scale: number): Vector3 {
        return new Vector3(this.x * scale, this.y * scale, this.z * scale);
    }
    public override normalize(): Vector3 {
        return this.scalar(1 / this.length());
    }
    public override negate(): Vector3 {
        return this.scalar(-1);
    }
    public override projectOn(other: Vector3): Vector3 {
        const normalized = other.normalize();
        return normalized.scalar(this.dotProduct(normalized));
    }
    public override midpoint(other: Vector3): Vector3 {
        return new Vector3((this.x + other.x) * 0.5, (this.y + other.y) * 0.5, (this.z + other.z) * 0.5);
    }
    public override withLength(length: number): Vector3 {
        return this.normalize().scalar(length);
    }

    public dotProduct(other: Vector3): number {
        return super.dotProduct(other);
    }
    public haveSameDirectionWith(other: Vector3): boolean {
        return super.haveSameDirectionWith(other);
    }
    public haveOppositeDirectionTo(other: Vector3): boolean {
        return super.haveOppositeDirectionTo(other);
    }
    public isPerpendicularTo(other: Vector3): boolean {
        return super.isPerpendicularTo(other);
    }
    public distanceTo(other: Vector3): number {
        return super.distanceTo(other);
    }
    public distanceToSquared(other: Vector3): number {
        return super.distanceToSquared(other);
    }

    public crossProduct(other: Vector3): Vector3 {
        return new Vector3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    }
}
