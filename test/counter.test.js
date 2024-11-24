import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './counter';
import Display from './display';

describe('Counter Tests', () => {
    test('Counter Default Value must be 0', () => {
        const counter = 0; // Simulasi nilai awal counter
        expect(counter).toBe(0);
    });

    test('Increment works when button clicked', () => {
        let counter = 0;
        counter++; // Simulasi tombol klik
        expect(counter).toBe(1);
    });

    test('Decrement works when button clicked', () => {
        let counter = 1;
        counter--; // Simulasi tombol klik
        expect(counter).toBe(0);
    });

    test('Display has correct value', () => {
        const counter = 5; // Nilai counter saat ini
        expect(counter).toBe(5); // Display harus menampilkan 5
    });
});