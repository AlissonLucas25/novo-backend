import { Request, Response } from 'express';
import Dog, { IDog } from '../models/Dog';

// Obter todos os cães
export const getAllDogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cães', error });
  }
};

// Obter um cão pelo ID
export const getDogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      res.status(404).json({ message: 'Cão não encontrado' });
      return;
    }
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cão', error });
  }
};

// Criar um novo cão
export const createDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDog = new Dog(req.body);
    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cão', error });
  }
};

// Atualizar um cão
export const updateDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDog) {
      res.status(404).json({ message: 'Cão não encontrado' });
      return;
    }
    res.status(200).json(updatedDog);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cão', error });
  }
};

// Excluir um cão
export const deleteDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) {
      res.status(404).json({ message: 'Cão não encontrado' });
      return;
    }
    res.status(200).json({ message: 'Cão excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cão', error });
  }
};