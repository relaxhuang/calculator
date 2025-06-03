package com.relax.calculator.command;

public class AddCommand implements Command {
    private final double a;
    private final double b;

    public AddCommand(double a, double b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public double execute() {
        return a + b;
    }

    @Override
    public double undo() {
        return a;  // Return to the first number
    }
} 