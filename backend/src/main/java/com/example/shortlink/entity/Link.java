package com.example.shortlink.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "links")
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    @Column(nullable = false)
    private String url;

    private int visits = 0;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public int getVisits() { return visits; }
    public void setVisits(int visits) { this.visits = visits; }
}
