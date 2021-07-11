import { Entity } from 'gecs';
import { Circle, Intersecting, Movement } from './components';

export const CircleEntity = Entity.with(Circle, Movement, Intersecting);
