import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: "Piedra del alma",
      done: false,
    },
    {
      id: 2,
      description: "Piedra del tiempo",
      done: false,
    },
    {
      id: 3,
      description: "Piedra de la mente",
      done: false,
    },
    {
      id: 4,
      description: "Piedra de la realidad",
      done: true,
    }
  ]

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }
}