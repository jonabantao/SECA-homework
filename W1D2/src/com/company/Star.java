package com.company;

import processing.core.PApplet;

public class Star {
    PApplet parent;

    private float x;
    private float y;

    Star(PApplet p) {
        parent = p;
        y = parent.random(0, parent.height);
        x = parent.random(0, parent.width);
    }

    void update() {
        x -= 1;

        if (x < 0) {
            x = parent.width;
            y = parent.random(0, parent.height);
        }
    }

    void show() {
        parent.fill(255);
        parent.noStroke();
        parent.ellipse(x, y, 3, 3);
    };
}
