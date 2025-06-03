package com.relax.calculator;

import com.relax.calculator.command.Command;
import org.springframework.stereotype.Component;

import java.util.Stack;

@Component
public class Calculator {
    private double currentValue;
    private final Stack<Command> undoStack;
    private final Stack<Command> redoStack;

    public Calculator() {
        this.currentValue = 0;
        this.undoStack = new Stack<>();
        this.redoStack = new Stack<>();
    }

    public double executeCommand(Command command) {
        currentValue = command.execute();
        undoStack.push(command);
        redoStack.clear();  // Clear redo stack when new command is executed
        return currentValue;
    }

    public double undo() {
        if (undoStack.isEmpty()) {
            return currentValue;
        }
        Command command = undoStack.pop();
        currentValue = command.undo();
        redoStack.push(command);
        return currentValue;
    }

    public double redo() {
        if (redoStack.isEmpty()) {
            return currentValue;
        }
        Command command = redoStack.pop();
        currentValue = command.execute();
        undoStack.push(command);
        return currentValue;
    }

    public double getCurrentValue() {
        return currentValue;
    }
} 