// Ejemplo del patron de diseño Factory method 
// utilizando POO y clases en JavaScript, las figuras geometricas
// son creadas aprtir de una clase abstracta Figura, que tiene un metodo bastracto para calcular el area
// y clases Circulo, Cuadrado y Triangulo que heredan de Figura y implementan el metodo para calcular el area
// y una clase FiguraFactory que tiene un metodo abstracto factoryMethod que crea una objeto de la clase Figura
// y una clase CircleFactoryConcreta que hereda de FiguraFactory y implementa el metodo factoryMethod
// y una clase CuadradoFactoryConcreta que hereda de FiguraFactory y implementa el metodo factoryMethod
// y una clase TrianguloFactoryConcreta que hereda de FiguraFactory y implementa el metodo factoryMethod

/**
 * Clase abstracta que representa una figura geométrica.
 * @param {string} nombre - Nombre de la figura.
 */
class Figura {
    constructor(nombre) {
        if (this.constructor === Figura) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this.nombre = nombre;
    }

    /**
     * Método abstracto para calcular el área de la figura.
     * @returns {number} Área de la figura.
     */
    calcularArea() {
        throw new Error("El metodo calcularArea debe ser implementado");
    }
}

/**
 * Clase que representa un círculo.
 * @param {number} radio - Radio del círculo.
 */
class Circulo extends Figura {
    constructor(radio) {
        super("Circulo");
        this.radio = radio;
    }

    /**
     * Calcula el área del círculo.
     * @returns {number} Área del círculo.
     */
    calcularArea() {
        return Math.PI * Math.pow(this.radio, 2);
    }
}

/**
 * Clase que representa un cuadrado.
 * @param {number} lado - Lado del cuadrado.
 */
class Cuadrado extends Figura {
    constructor(lado) {
        super("Cuadrado");
        this.lado = lado;
    }

    /**
     * Calcula el área del cuadrado.
     * @returns {number} Área del cuadrado.
     */
    calcularArea() {
        return Math.pow(this.lado, 2);
    }
}

/**
 * Clase que representa un triángulo.
 * @param {number} base - Base del triángulo.
 * @param {number} altura - Altura del triángulo.
 */
class Triangulo extends Figura {
    constructor(base, altura) {
        super("Triangulo");
        this.base = base;
        this.altura = altura;
    }

    /**
     * Calcula el área del triángulo.
     * @returns {number} Área del triángulo.
     */
    calcularArea() {
        return (this.base * this.altura) / 2;
    }
}

/**
 * Clase abstracta para la fábrica de figuras.
 */
class FiguraFactory {
    /**
     * Método abstracto para crear una figura.
     * @returns {Figura} Instancia de una figura.
     */
    factoryMethod() {
        throw new Error("El metodo factoryMethod debe ser implementado");
    }

    /**
     * Crea una figura usando el método factoryMethod.
     * @returns {Figura} Instancia de una figura.
     */
    crearFigura() {
        return this.factoryMethod();
    }
}

/**
 * Fábrica concreta para crear círculos.
 * @param {number} radio - Radio del círculo.
 */
class CirculoFactoryConcreta extends FiguraFactory {
    constructor(radio) {
        super();
        this.radio = radio;
    }

    /**
     * Crea una instancia de Circulo.
     * @returns {Circulo} Instancia de Circulo.
     */
    factoryMethod() {
        return new Circulo(this.radio);
    }
}

/**
 * Fábrica concreta para crear cuadrados.
 * @param {number} lado - Lado del cuadrado.
 */
class CuadradoFactoryConcreta extends FiguraFactory {
    constructor(lado) {
        super();
        this.lado = lado;
    }

    /**
     * Crea una instancia de Cuadrado.
     * @returns {Cuadrado} Instancia de Cuadrado.
     */
    factoryMethod() {
        return new Cuadrado(this.lado);
    }
}

/**
 * Fábrica concreta para crear triángulos.
 * @param {number} base - Base del triángulo.
 * @param {number} altura - Altura del triángulo.
 */
class TrianguloFactoryConcreta extends FiguraFactory {
    constructor(base, altura) {
        super();
        this.base = base;
        this.altura = altura;
    }

    /**
     * Crea una instancia de Triangulo.
     * @returns {Triangulo} Instancia de Triangulo.
     */
    factoryMethod() {
        return new Triangulo(this.base, this.altura);
    }
}

// Ejemplo de uso
const circuloFactory = new CirculoFactoryConcreta(5);
const circulo = circuloFactory.crearFigura();