package com.relax.calculator;

import com.relax.calculator.command.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {
    private final Calculator calculator;

    @Autowired
    public CalculatorController(Calculator calculator) {
        this.calculator = calculator;
    }

    @PostMapping("/add")
    public double add(@RequestParam double a, @RequestParam double b) {
        return calculator.executeCommand(new AddCommand(a, b));
    }

    @PostMapping("/subtract")
    public double subtract(@RequestParam double a, @RequestParam double b) {
        return calculator.executeCommand(new SubtractCommand(a, b));
    }

    @PostMapping("/multiply")
    public double multiply(@RequestParam double a, @RequestParam double b) {
        return calculator.executeCommand(new MultiplyCommand(a, b));
    }

    @PostMapping("/divide")
    public double divide(@RequestParam double a, @RequestParam double b) {
        return calculator.executeCommand(new DivideCommand(a, b));
    }

    @PostMapping("/undo")
    public double undo() {
        return calculator.undo();
    }

    @PostMapping("/redo")
    public double redo() {
        return calculator.redo();
    }

    @GetMapping("/current")
    public double getCurrentValue() {
        return calculator.getCurrentValue();
    }
} 