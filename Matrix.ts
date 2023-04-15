class Matrix {
    protected _columns: Vector[];
    constructor(columns: Vector[]) {
        this._columns = columns;
    }
    get columns() { return this._columns; }

    public rows() {
        const matrix = this.columns[0].components.map((_, column) => this.columns.map(row => row.components[column]))
        return new Matrix(matrix.map(vector => new Vector(vector)));
    }
    public transpose() {
        return new Matrix(this.rows().columns)
    }
    protected componentWiseOperation(func: Function, columns: Vector[]) {
        columns.map((column, index) => column.components.map((row, i) => func(this.columns[i].components[index], row)))
    }
    public add(other: Matrix) {
        return this.componentWiseOperation((ac: number, bc: number) => ac + bc, other.columns);
    }
    public subtract(other: Matrix) { 
        return this.componentWiseOperation((ac: number, bc: number) => ac - bc, other.columns);
    }
    public scalar(scale: number) {
        return new Matrix(this.columns.map(column => new Vector(column.components.map(component => component * scale))));
    }
    public toString() {
        let out = ''
        this.columns.forEach((vector, index) => {
            if (vector.equalTo(this.columns[this.columns.length - 1])) out += `${index}: ${vector.toString()}`
            else out += `${index}: ${vector.toString()}, `
        })
        return out;
    }
}
