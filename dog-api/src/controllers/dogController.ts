import { Request, Response } from 'express';
import Dog, { IDog } from '../models/Dog';

// Obter todos os cachorros
export const getAllDogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cachorros', error });
  }
};

// Obter um cachorro pelo ID
export const getDogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      res.status(404).json({ message: 'Cachorro não encontrado' });
      return;
    }
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cachorro', error });
  }
};

// Criar um novo cachorro
export const createDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, raca, peso, idade, proprietario, name, breed, weight, age, owner } = req.body as any;
    const foto = (req as any).file?.filename || null;

    const finalName = name ?? nome;
    const finalBreed = breed ?? raca;
    const finalWeight = typeof weight !== 'undefined' ? weight : peso;
    const finalAge = typeof age !== 'undefined' ? age : idade;
    const finalOwner = owner ?? proprietario;

    if (!finalName || !finalBreed || finalWeight === undefined || finalAge === undefined || !finalOwner || !foto) {
      res.status(400).json({ message: 'Todos os campos são obrigatórios (nome, raca, peso, idade, proprietario, foto)' });
      return;
    }

    const newDog = new Dog({
      name: finalName,
      breed: finalBreed,
      weight: Number(finalWeight),
      age: Number(finalAge),
      owner: finalOwner,
      foto,
    });

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    console.error('Erro ao criar cão:', error);
    res.status(400).json({ message: 'Erro ao criar cachorro', error });
  }
};

// Atualizar um cachorro
export const updateDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, raca, peso, idade, proprietario, name, breed, weight, age, owner } = req.body as any;
    const foto = (req as any).file?.filename;

    const updateData: Partial<IDog> & { [key: string]: any } = {};
    if (nome || name) updateData.name = name ?? nome;
    if (raca || breed) updateData.breed = breed ?? raca;
    if (typeof peso !== 'undefined' || typeof weight !== 'undefined') updateData.weight = Number(weight ?? peso);
    if (typeof idade !== 'undefined' || typeof age !== 'undefined') updateData.age = Number(age ?? idade);
    if (proprietario || owner) updateData.owner = owner ?? proprietario;
    if (foto) updateData.foto = foto;

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedDog) {
      res.status(404).json({ message: 'Cachorro não encontrado' });
      return;
    }
    res.status(200).json(updatedDog);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cachorro', error });
  }
};

// Excluir um cachorro
export const deleteDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) {
      res.status(404).json({ message: 'Cachorro não encontrado' });
      return;
    }
    res.status(200).json({ message: 'Cachorro excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cachorro', error });
  }
};