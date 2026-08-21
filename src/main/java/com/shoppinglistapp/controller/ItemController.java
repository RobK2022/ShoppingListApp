package com.shoppinglistapp.controller;

import com.shoppinglistapp.entity.Item;
import com.shoppinglistapp.repository.ItemRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ItemController {

    private final ItemRepository repository;

    public ItemController(ItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("items", repository.findAll());
        model.addAttribute("newItem", new Item());
        return "index";
    }

    @PostMapping("/add")
    public String addItem(@ModelAttribute("newItem") Item item) {
        repository.save(item);
        return "redirect:/";
    }

    @GetMapping("/toggle/{id}")
    public String toggleItem(@PathVariable Long id) {
        repository.findById(id).ifPresent(item -> {
            item.setCompleted(!item.getCompleted());
            repository.save(item);
        });
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
        return "redirect:/";
    }
}