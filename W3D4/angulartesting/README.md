# UI End-to-end Testing with Selenium

## Learning Objectives

- Write end-to-end tests in Java using Selenium / Selenide 
- Test an application in Chrome
- Test an application with a headless browser

## What are end-to-end tests?

User interfaces and APIs have a lot in common from a developer's perspective. Both should be easy-to-use, feature-packed, and defect-free. The end user, whether they are clicking through an interface or making API calls to interact with our data, should have confidence in our code. Our users cannot be confident in our product if we ourselves are not confident. Therefore, we must test our code and we must test it thoroughly. 

Unit tests are great for propping up the low-level details of our application, but our users won't be interacting with individual units of code. We need tests that see what the users see: A full, spinning world of databases, servers, and browser tabs, filled with chaos. Only once our tests have passed through this chaos unscathed should we allow our code to enter the world. 

How do we make this happen? Do we spin up a full environment and hire manual testers to click every one of our buttons in every order imaginable? This answer used to be "yes," but modern tools have allowed us to achieve very similar results in a fully-automated way. 

Today we're going to see how end-to-end UI tests allow us to create a completely real environment and simulate real user actions inside of a Chrome browser. Instead of testing isolated blocks of code or a single API, we will be able to test a user's entire experience. 

## Selenium and Selenide

Selenium is a tool that simulates real user interactions inside of a real browser. We can configure our Selenium tests to perform actions such as opening a browser window, visiting a URL, clicking a button, submitting a form, or refreshing a page. Once these actions have been performed, we can use its simple API to inspect the page and make assertions about its state. 

Selenium is available in several programming languages and has become a standard tool for end-to-end testing.

While Selenium is incredibly powerful for a free tool, its syntax can feel a little heavy and dated. There are also several repetitive steps that must be taken to set up and tear down a Selenium test. For this reason, many tools have been created to "wrap" the Selenium syntax and make it easier to use. One of these tools for Java is called Selenide. Today, we are going to use Selenide to provide a clean, fluent interface on top of our Selenium tests. We'll have all of the power of Selenium, with an easy to use, jQuery-like syntax.

An in-depth comparison of Selenium and Selenide syntax is available [here](https://github.com/codeborne/selenide/wiki/Selenide-vs-Selenium).

Let's see what it looks like!

### Starter Code

The provided starter code has a pre-built set of microservices with a Angular UI that consumes them. For today, we will be writing our tests around this already-existing code. In the future, we will write these tests BEFORE any production code is written, according to the [Three Laws of Test-Driven Development](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd).

### Install Dependencies

Let's go into the starter code and add some new dependencies for our tests. We'll add the following Selenium and Selenide test dependencies to the `build.gradle`:

```groovy
testCompile 'org.seleniumhq.selenium:selenium-java:3.9.1'
testCompile 'org.seleniumhq.selenium:selenium-api:3.9.1'
testCompile 'org.seleniumhq.selenium:selenium-remote-driver:3.9.1'
testCompile 'org.seleniumhq.selenium:selenium-chrome-driver:3.9.1'
testCompile 'org.seleniumhq.selenium:selenium-support:3.9.1'
testCompile 'com.codeborne:selenide:4.10.01'
```

It's very important that we add all of these Selenium dependencies when working with a Spring Boot application. Spring Boot by default includes Selenium, but it includes an older version that does not always play nicely with Selenide. These new dependencies will allow us to override the provided Spring Boot version.

## Demo - Selenium Test

Let's create a new test class `DemoTest.java` in the current project under `src/test/com/example/springbootmicroservicewrapperwithtests` package. Then, create a new method `demoTest()` in it, annotate it with `@Test`.

Then, static import the Selenide packages. Normally we could let the IDE do this, but it's easier with this tool to just include everything from the start. Your class should look like,

```java
import org.junit.Test;

import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.Condition.*;

public class DemoTest {

  @Test
  public void demoTest(){
  }
  
}  
```

### Running tests in Chrome

We'll want to run these tests in a real browser, so let's configure this test to run in Chrome. Selenide chooses Firefox by default, but we're going to need Chrome to make things run a little faster later on. The [Selenide documentation](http://selenide.org/documentation.html) has plenty of good info about browser support and swapping browsers.

Add this line inside of our `@Test` method:

```java
...
System.setProperty("selenide.browser", "Chrome");
...
```

### Testing it out with Google

Let's give Selenide a test-drive by opening [Google](http://www.google.com) in the browser, making a search, and checking the results.

In our test, we can simulate our behavior

```java
...
open("http://www.google.com");

WebElement queryBox = $(By.name("q"));
queryBox.sendKeys("Kent Beck");
queryBox.submit();

$("body").shouldHave(text("extreme programming"));
```

`JavaScript` developers will immediately notice that this syntax looks just like jQuery! It even uses the familiar `$` method.

When we run it, we see that a Chrome window pops open and the input runs as if a ghost were using our computer!

### Testing our UI

Now Let's look at the test class `UsersApiFeatureTest.java` in the `features` test package.

There is already some starter-code in it to get started. Let's drop in some feature-testing boilerplate, along with some code to create our test `Users`:

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UsersUIFeatureTest {

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
}
```

```java
@Test
public void shouldAllowFullCrudFunctionalityForAUser() throws Exception {

	User firstUser = new User(
		"someone",
		"Ima",
		"Person"
	);

	User secondUser = new User(
		"someone_else",
		"Someone",
		"Else"
	);

	Stream.of(firstUser, secondUser)
	      .forEach(user -> {
		      userRepository.save(user);
	      });	
	    
}
```

Before we start with our feature tests, let's take a momement to go through how http calls can be unit tested in Java. We are using a library REST-assured, that helps in testing and validating REST calls easily in Java. You can read more about it, <a href="http://rest-assured.io/">here</a>. 

Take a look at code,

```java
...
    when()
         .get("http://localhost:8080/api/users")
         .then()
         .statusCode(is(200))
         .and()
         .body(containsString("someone"))
         .and()
         .body(containsString("someone_else"));              

    when()
         .get("http://localhost:8080/api/users/" + secondUser.getId())
         .then()
         .statusCode(is(200))
         .body(containsString("Someone"))
         .body(containsString("Else"));

    when()
         .delete("http://localhost:8080/api/users/" + secondUser.getId())
         .then()
         .statusCode(is(200));
...
```

## Writing a feature test for our Angular app

Now that we see what these tools can do for us, let's write real tests for the Angular app. The important thing to note is that this feature test should not care that we are using Angular or any other framework. This test is simulating a real user, and real users don't care what tools we use as long as they can accomplish their task. Therefore, we're only going to make basic HTML assumptions to write these tests. As long as the user sees HTML on the page, they are happy. 

The benefit of this style of testing is that later on, if we rewrite our UI with Vue or React, these feature tests won't need to be changed (unless we change the actual functionality). This type of framework-agnostic testing allows for extremely powerful and safe refactoring down the road.

Let's start with a few assumptions: 

- The users will show up inside a tag with the ID of `#users-wrapper`
- Each individual user element will have an ID of `#user-{ID}` (e.g. `#user-1234`)
- Each individual user element will also have a `data-` attribute of `data-user-display`. We'll use this to count the number of Users that appear on the page. We could put a `CSS class` on our user blocks to accomplish the same thing, but we should be able to swap classes without affecting our tests. 
- Each `#user-{ID}` tag will have nested `#user-{ID}-user-name`, `#user-{ID}-first-name`, and `#user-{ID}-last-name` tags

## Testing initial User data

Let's remove our Google example and start writing tests for these assumptions. We'll start with a simple set of steps:

1. Create two users in the database
2. Visit the UI at `localhost:4200` in Chrome
3. Check that two `Users` are on the page using our `data-` attribute

```java
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

	// Visit the UI in a browser
	open("http://localhost:4200");

	// There should only be two users
	$$("[data-user-display]").shouldHave(size(2));
}
```

> `$$` can be read as "find all"

Now let's add some lower-level assertions. We want to make sure that the `userName`, `firstName`, and `lastName` of each `User` shows up on the page. We'll find each section by ID and assert that the contents match up with our test data:

```java
... 

// Test that all data shows up for each user
long firstUserId = firstUser.getId();
$("#user-" + firstUserId + "-user-name").shouldHave(text("someone"));
$("#user-" + firstUserId + "-first-name").shouldHave(text("Ima"));
$("#user-" + firstUserId + "-last-name").shouldHave(text("Person"));

long secondUserId = secondUser.getId();
$("#user-" + secondUserId + "-user-name").shouldHave(text("someone_else"));
$("#user-" + secondUserId + "-first-name").shouldHave(text("Someone"));
$("#user-" + secondUserId + "-last-name").shouldHave(text("Else"));

...
```

It looks like everything is showing up properly! Let's try to create a new user. 

## Testing Create

We'll need to check a few things:

- The "Create New User" link should show us the User form. It is not important that it is on a new page, just that it shows up when I click the link.
- When I fill in the form and submit, I should see the list of Users on the page. 
- The new User should appear in the list of Users, and when I refresh the page, it should still be there. In other words, the User should appear on the page and also be stored in the database.

Let's see what this looks like:

```java
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
``` 

## Testing Delete

Let's test the delete button. We'll need to click the button and assert that:

- Only one user disappears
- The user that disappears is the one we chose to delete

Let's try it out:

```java
// Test Deleting the first user
$("#user-" + firstUserId + firstUserId).should(exist);
$$("[data-user-display]").shouldHave(size(3));

$("#delete-user-" + firstUserId).click();
$("#user-" + firstUserId).shouldNot(exist);

$$("[data-user-display]").shouldHave(size(2));
```

It all works! 

## Speed things up with headless

It's cool to watch our "ghost user" interact with our app, but this can slow things down. Recent versions of chrome now ship with a "headless" mode. This mode will run the underlying Chrome code without all of the unnecessary visual stuff. This can be turned on very easily with a simple Selenide property. Let's drop this new property assignment into the top of our test and see what happens:

```java
System.setProperty("selenide.headless", "true");
```

## You Do

Pair up and test-drive a new update feature for our UI.

The API is already set up to receive a `PATCH` request at `localhost:4200/api/users`, you will only have to add the 
 code.

Remember:

- Add on to the feature test first. Look for a properly failing test.
- Once the test is failing, add the update form for the User. 
- The test will pass when everything works!
