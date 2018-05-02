package com.company;

import processing.core.PApplet;

public class Ship {
    PApplet parent;
    boolean[] keys = new boolean[128];

    private float x;
    private float y;

    Ship(PApplet p) {
        parent = p;
        y = parent.height / 2;
        x = 150;
    }

    void show() {
        parent.fill(200, 0, 0, 255);
        parent.noStroke();
        move();
        parent.rect(x, y, 60, 20);
    }

    void move() {
        if (parent.keyPressed) {
            if (parent.key == 'w') {
                y -= 2;
            }

            if (parent.key == 'a') {
                x -= 2;
            }

            if (parent.key == 'd') {
                x += 2;
            }

            if (parent.key == 's') {
                y += 2;
            }
        }
    }
}
