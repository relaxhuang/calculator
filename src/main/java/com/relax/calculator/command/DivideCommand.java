package com.relax.calculator.command;

public class DivideCommand implements Command {
    private final double a;
    private final double b;

    public DivideCommand(double a, double b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public double execute() {
        if (b == 0) {
            throw new ArithmeticException("Division by zero is not allowed");
        }
        return a / b;
    }

    @Override
    public double undo() {
        return a;  // Return to the first number
    }
} 