package com.example.springbootmicroservicewrapperwithtests.features;

import com.example.springbootmicroservicewrapperwithtests.models.User;
import com.example.springbootmicroservicewrapperwithtests.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.codeborne.selenide.CollectionCondition.size;
import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.Condition.*;

import java.util.stream.Stream;

import static io.restassured.RestAssured.when;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UsersApiFeatureTest {

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() {
        userRepository.deleteAll();
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    public void shouldAllowFullCrudFunctionalityForAUser() throws Exception {

        User firstUser = new User(
                "someone",
                "Ima",
                "Person"
        );
        firstUser = userRepository.save(firstUser);
        Long firstUserId = firstUser.getId();

        User secondUser = new User(
                "someone_else",
                "Someone",
                "Else"
        );
        secondUser = userRepository.save(secondUser);
        Long secondUserId = secondUser.getId();


        System.setProperty("selenide.browser", "Chrome");
        System.setProperty("selenide.headless", "true");

        // Visit the UI in a browser
        open("http://localhost:4200");

        // There should only be two users
        $$("[data-user-display]").shouldHave(size(2));

        $("#user-" + firstUserId + "-user-name").shouldHave(text("someone"));
        $("#user-" + firstUserId + "-first-name").shouldHave(text("Ima"));
        $("#user-" + firstUserId + "-last-name").shouldHave(text("Person"));

        $("#user-" + secondUserId + "-user-name").shouldHave(text("someone_else"));
        $("#user-" + secondUserId + "-first-name").shouldHave(text("Someone"));
        $("#user-" + secondUserId + "-last-name").shouldHave(text("Else"));

        // Visit the new user page
        $("#new-user-link").click();

        // Make sure the link worked and the form is now showing
        $("#new-user-form").should(appear);

        // Add a new user
        $("#new-user-user-name").sendKeys("third_user");
        $("#new-user-first-name").sendKeys("Third");
        $("#new-user-last-name").sendKeys("User");
        $("#new-user-submit").click();

        // Make sure we're now on the users page again
        $("#users-wrapper").should(appear);

        // Now there should be three Users
        $$("[data-user-display]").shouldHave(size(3));

        refresh();

        // Now there should be three Users again after the refresh
        $$("[data-user-display]").shouldHave(size(3));

        // Check that the data is showing up for the third User
        Long thirdUserId = secondUserId + 1;
        $("#user-" + thirdUserId + "-user-name").shouldHave(text("third_user"));
        $("#user-" + thirdUserId + "-first-name").shouldHave(text("Third"));
        $("#user-" + thirdUserId + "-last-name").shouldHave(text("User"));


        $("#user-" + firstUserId + "-user-name").should(exist);
        $$("[data-user-display]").shouldHave(size(3));

        $("#delete-user-" + firstUserId).click();
        $("#user-" + firstUserId + "-user-name").shouldNot(exist);

        $$("[data-user-display]").shouldHave(size(2));

        // Test if there's a button
        $("#user-" + secondUserId + "-user-name").should(exist);
        $("#edit-user-" + secondUserId).click();

        $("#edit-user-form").should(appear);

        $("#edit-user-first-name").clear();
        $("#edit-user-first-name").sendKeys("tester");
        $("#edit-user-last-name").clear();
        $("#edit-user-last-name").sendKeys("tester last");
        $("#edit-user-submit-" + secondUserId).click();

        $("#users-wrapper").should(appear);

        $("#user-" + secondUserId + "-first-name").shouldHave(text("tester"));
        $("#user-" + secondUserId + "-last-name").shouldHave(text("tester last"));

        /*

        Stream.of(firstUser, secondUser)
                .forEach(user -> {
                    userRepository.save(user);
                });

        when()
                .get("/api/users")
                .then()
                .statusCode(is(200))
                .and()
                .body(containsString("someone"))
                .and()
                .body(containsString("someone_else"));

        when()
                .get("/api/users/" + secondUser.getId())
                .then()
                .statusCode(is(200))
                .body(containsString("Someone"))
                .body(containsString("Else"));

        when()
                .delete("/api/users/" + secondUser.getId())
                .then()
                .statusCode(is(200));
         */
    }


}
