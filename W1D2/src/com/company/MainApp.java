package com.company;

import processing.core.PApplet;

public class MainApp extends PApplet {
    Star[] stars = new Star[75];
    Ship ship;

    public static void main(String[] args) {
        PApplet.main("com.company.MainApp", args);
    }

    public void settings() {
        size(800, 600);
    }

    public void setup() {
        for (int i = 0; i < stars.length; i++) {
            stars[i] = new Star(this);
        }

        ship = new Ship(this);
    }

    public void draw() {
        background(0);

        for (Star star : stars) {
            star.update();
            star.show();
        }

        ship.show();

    }
}
