// src/service.js

const PrimaryRepository = require('./repository'); // Pastikan jalur ini benar
const SecondaryRepository = require('./SecondaryRepository'); // Pastikan jalur ini juga benar

class Service {
    constructor() {
        this.primaryRepository = new PrimaryRepository();
        this.secondaryRepository = new SecondaryRepository();
    }

    getAllItems() {
        // Mengambil semua item dari kedua repositori
        return [
            ...this.primaryRepository.getAllItems(),
            ...this.secondaryRepository.getAllItems(),
        ];
    }

    getItemById(id) {
        let item = this.primaryRepository.getItemById(id);
        if (!item) {
            item = this.secondaryRepository.getItemById(id);
        }
        if (!item) {
            throw new Error('Item not found in both repositories');
        }
        return item;
    }

    deleteItemById(id) {
        // Mencoba menghapus item dari primary repository
        let item = this.primaryRepository.deleteItemById(id);
        
        // Jika item tidak ditemukan di primary, coba hapus di secondary
        if (!item) {
            item = this.secondaryRepository.deleteItemById(id);
        }
        
        // Jika item tidak ditemukan di kedua repository, lempar error
        if (!item) {
            throw new Error('Item not found in both repositories');
        }
        
        // Kembalikan item yang dihapus
        return item;    
        }
    
    }

module.exports = Service;

