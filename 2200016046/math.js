export function tambah(a, b) { 
    if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Input harus berupa angka');
}
    return a + b;
}

export function kali(a, b) { 
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Input harus berupa angka');
    }
    return a * b;
}

export function kurang(a, b) {
    return a - b;
}

export function bagi(a, b) {
    if (b === 0) {
        throw new Error('Tidak bisa membagi dengan nol');
    }
    return a / b;
}
