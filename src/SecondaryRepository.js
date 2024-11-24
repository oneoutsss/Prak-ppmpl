class SecondaryRepository {
    constructor() {
        this.data = [
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
        ];
    }

    getAllItems() {
        return this.data;
    }

    getItemById(id) {
        return this.data.find(item => item.id === id);
    }

    deleteItemById(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Item not found');
        }
        return this.data.splice(index, 1)[0];
    }
}

module.exports = SecondaryRepository; // Pastikan ini ada
