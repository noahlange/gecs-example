import { Entity } from 'gecs';
import { Movement, Position, Shape } from './components';

export const MovableShape = Entity.with(Movement, Shape, Position);
