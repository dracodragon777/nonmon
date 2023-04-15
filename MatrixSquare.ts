class MatrixSquare extends Matrix {
    constructor(size: number, fill: number) {
        super(new Array<Vector>(size).fill(new Vector(new Array<number>(size).fill(fill))))
    }
    get size() { return this.columns.length; }

    public set(x: number, y: number, value: number) {
        if(x < this._columns.length && y < this._columns[x].components.length) this._columns[x].components[y] = value;
        else console.log(`::: Error MatrixSquare.Set(${x}, ${y}) ::: out of bounds`);
    }

    public multiply(other: Matrix) {
        if (this.columns[0].components.length !== other.columns.length) {
            throw new Error('The number of columns of this matrix is not equal to the number of rows of the given matrix.');
        }
        const rows = other.rows().columns,
            newRows = this.columns.map(column =>
                rows.map(row => row.components.map((component, index) => component * column.components[index]).reduce((acc, current) => acc += current)
                ))
        return new Matrix(newRows.map(vector => new Vector(vector)));
    }
    private _determinant(matrix: Vector[]) {
        if (matrix.length === 1) return matrix[0].components[0];
        else if (matrix.length === 2) return matrix[0].components[0] * matrix[1].components[1] - matrix[0].components[1] * matrix[1].components[0];
        let det = 0;
        matrix.forEach((_, i) => {
            const subMatrixColumns = matrix.slice(0, i).concat(matrix.slice(i + 1)),
                subMatrix = subMatrixColumns.map(column => new Vector(column.components.slice(1)));
            det += matrix[i].components[0] * (i % 2 === 0 ? 1 : -1) * this._determinant(subMatrix);
        })
        return det;
    }
    public determinant() {
        if (this.columns.length !== this.columns[0].components.length) throw new Error('Determinant is only defined for square matrices.');
        return this._determinant(this.columns);
    }
}
