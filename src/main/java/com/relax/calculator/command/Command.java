package com.relax.calculator.command;

public interface Command {
    double execute();
    double undo();
} 