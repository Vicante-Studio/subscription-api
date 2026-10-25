import dotenv from 'dotenv';
import express from 'express'

dotenv.config();

const PORT = Number(process.env.port) || 6000;

console.log(`Server running on Port ${PORT}`)