package com.example.shortlink.controller;

import com.example.shortlink.entity.Link;
import com.example.shortlink.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;
import java.util.Random;

@RestController
public class LinkController {
    @Autowired
    private LinkRepository repository;

    private String generateCode() {
        String chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random r = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(r.nextInt(chars.length())));
        }
        return sb.toString();
    }

    @PostMapping("/api/links")
    public Map<String, String> create(@RequestBody Map<String, String> body) {
        String url = body.get("url");
        if (url == null || url.isEmpty()) {
            throw new IllegalArgumentException("url required");
        }
        Link link = new Link();
        link.setCode(generateCode());
        link.setUrl(url);
        repository.save(link);
        return Map.of("code", link.getCode(), "short_url", "/" + link.getCode());
    }

    @GetMapping("/{code}")
    public RedirectView redirect(@PathVariable String code) {
        return repository.findByCode(code)
                .map(link -> {
                    link.setVisits(link.getVisits() + 1);
                    repository.save(link);
                    return new RedirectView(link.getUrl());
                })
                .orElseThrow(() -> new RuntimeException("Not found"));
    }
}
