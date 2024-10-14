// test/service.test.js

const sinon = require('sinon');
const { expect } = require('chai');
const Service = require('../src/service');
const PrimaryRepository = require('../src/repository'); // Pastikan path benar
const SecondaryRepository = require('../src/SecondaryRepository'); // Pastikan path benar

describe('Service Integration Tests', () => {
    let service;
    let primaryRepositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        // Membuat stub untuk PrimaryRepository dan SecondaryRepository
        primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository, {
            deleteItemById: sinon.stub(),  // Stub untuk metode deleteItemById
        });
    
        secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository, {
            deleteItemById: sinon.stub(),  // Stub untuk metode deleteItemById
        });
    
        // Menginisialisasi service dengan stubs
        service = new Service();
        service.primaryRepository = primaryRepositoryStub;
        service.secondaryRepository = secondaryRepositoryStub;
    });
    

    it('should return all items', () => {
        const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
        primaryRepositoryStub.getAllItems.returns(items); // Mengatur stub untuk getAllItems
        secondaryRepositoryStub.getAllItems.returns([]); // Menambahkan stub untuk secondary repository

        const result = service.getAllItems();

        expect(result).to.deep.equal(items); // Menggunakan deep.equal untuk membandingkan objek
        expect(primaryRepositoryStub.getAllItems.calledOnce).to.be.true;
    });

    it('should return an item by id', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);
        const result = service.getItemById(1);

        expect(result).to.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
    });

    it('should delete an item by id from primary repository', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.deleteItemById.withArgs(1).returns(item); // Mengatur stub untuk deleteItemById

        const result = service.deleteItemById(1);
        expect(result).to.equal(item);
        expect(primaryRepositoryStub.deleteItemById.calledOnceWith(1)).to.be.true;
    });

    it('should delete an item by id from secondary repository if not found in primary', () => {
        const item = { id: 3, name: 'Item 3' };
        
        // Mengatur primaryRepositoryStub untuk mengembalikan undefined
        primaryRepositoryStub.deleteItemById.withArgs(3).returns(undefined); // Item tidak ditemukan di primary
        
        // Mengatur secondaryRepositoryStub untuk mengembalikan item yang benar
        secondaryRepositoryStub.deleteItemById.withArgs(3).returns(item); // Ubah ke ID 3
        
        const result = service.deleteItemById(3); // Memanggil metode yang diuji dengan ID 3
        console.log('Result:', result); // Tambahkan log untuk melihat hasil
        
        expect(result).to.deep.equal(item); // Memastikan item yang benar dikembalikan
        expect(primaryRepositoryStub.deleteItemById.calledOnceWith(3)).to.be.true; // Memastikan dipanggil sekali
        expect(secondaryRepositoryStub.deleteItemById.calledOnceWith(3)).to.be.true; // Memastikan dipanggil sekali
    });    
    
});
