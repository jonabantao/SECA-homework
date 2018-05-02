package com.company;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.HashMap;
import java.util.Deque;


public class Main {

    public static void main(String[] args) {
        int[] maxValTest1 = {1, 2, 3, 4, 5};
        int[] maxValTest2 = {5, 2, 3, 4, 6};

        int[]addAndMinusTest1 = {1, 21};
        int[]addAndMinusTest2 = {1, 21, 3, 20};

        ArrayList<String> nameListTest1 = new ArrayList<>();
        nameListTest1.add("jon");
        nameListTest1.add("jill");
        nameListTest1.add("jon");


        System.out.println("isPalindrome (racecar): " + isPalindrome("racecar"));
        System.out.println("isPalindrome (abcd): " + isPalindrome("abcd") + "\n");

        System.out.println("findMaxValue ({1,2,3,4,5}) " + findMaxValue(maxValTest1));
        System.out.println("findMaxValue ({5,2,3,4,6}) " + findMaxValue(maxValTest2) + "\n");
        System.out.println(everyOtherABCD() + "\n");

        System.out.println("findNumbersOfDaysInMonth January (1): " + findNumberOfDaysInMonth(1));
        System.out.println("findNumbersOfDaysInMonth Octorary (300): " + findNumberOfDaysInMonth(300) + "\n");

        System.out.println("crazyAddAndMinus {1, 21} == -2: " + crazyAddAndMinus(addAndMinusTest1));
        System.out.println("crazyAddAndMinus {1, 21, 3, 20} == 0: " + crazyAddAndMinus(addAndMinusTest2) + "\n");

        System.out.println("filterUniqueNames([\"jon\", \"jill\", \"jon\"]) == jon, jill: " + filterUniqueNames(nameListTest1) + "\n");

        System.out.println("removeVowels(\"ELePHaNt\") == \"LPHNt\": " + removeVowels("ELePHaNt") + "\n");

//        System.out.println(findFamilyMembersAge());
        swapFirstAndLastCountry();
    }

    // Write a function that takes in a word. This function should return true if the word is a palindrome and false if
    // it is not. A string is considered a palindrome if it remains unchanged when reversed. For example, "dad" is a
    // palindrome as reverse of "dad" is "dad", whereas "program" is not a palindrome. Note: palindromes are case
    // insensitive ("Dad" and "dad" are both palindromes).
    public static boolean isPalindrome(String str) {
        int len = str.length();
        int mid = len / 2;


        for (int i = 0; i < mid; i++) {
            if (str.charAt(i) != str.charAt(len - i - 1)) {
                return false;
            }
        }

        return true;
    }

    // Write a function that accepts no parameters and creates a list of any characters and returns a string, which
    // contains every other element in the list. Thus, if the list has 'a', 'b', 'c', 'd', the output should be "bd".
    public static String everyOtherABCD() {
        String result = "";
        String abcd = "abcd";
        int abcdLen = abcd.length();

        for (int i = 1; i < abcdLen; i += 2) {
            result += abcd.charAt(i);
        }

        return result;
    }

    // Write a function that takes in an array of integers and returns the max value in that array. Please do not sort
    // the array.
    public static int findMaxValue(int[] numbers) {
        if (numbers.length == 0) {
            return 0;
        }

        int max = numbers[0];
        int len = numbers.length;

        for (int i = 0; i < len; i++) {
            max = Math.max(max, numbers[i]);
        }

        return max;
    }

    // Write a function that takes in a month of the year and returns the number of days in this month. If the input is
    // not a valid month, return 0.
    public static int findNumberOfDaysInMonth(int month) {
        switch (month) {
            case 1: return 31;
            case 2: return 28;
            case 3: return 31;
            case 4: return 30;
            case 5: return 31;
            case 6: return 30;
            case 7: return 31;
            case 8: return 31;
            case 9: return 30;
            case 10: return 31;
            case 11: return 30;
            case 12: return 31;
            default: return 0;
        }
    }

    // Write a function that takes in an array of integers, sums the integers that are greater than 1, and subtracts 3
    // if the number is greater than 20. The function returns the result of the operations on the array.
    public static int crazyAddAndMinus(int[] numbers) {
        int sum = 0;
        int len = numbers.length;

        for (int i = 0; i < len; i++) {
            if (numbers[i] > 20) {
                sum -= 3;
            } else if (numbers[i] > 0) {
                sum ++;
            }
        }

        return sum;
    }

    // Write a function that takes in a list of names, filters the list removing all duplicate names and returns a list
    // with unique names.
    public static ArrayList<String> filterUniqueNames(ArrayList<String> names) {
        ArrayList<String> filteredNames = new ArrayList<>();
        HashSet<String> foundNames = new HashSet<>();

        names.forEach((name) -> {
            if (!foundNames.contains(name)) {
                filteredNames.add(name);
            }

            foundNames.add(name);
        });

        return filteredNames;
    }

    // Write a function that takes in a string, omits all vowels and returns a new string that contains only consonants.
    // Make sure to catch the edge cases (e.g. empty string, upper/lower case).
    public static String removeVowels(String str) {
        String vowelsRemoved = "";
        int len = str.length();
        HashSet<Character> vowels = new HashSet<Character>() {{
            add('a');
            add('e');
            add('i');
            add('o');
            add('u');
        }};

        for (int i = 0; i < len; i++) {
            char strChar = str.charAt(i);

            if (!vowels.contains(Character.toLowerCase(strChar))) {
                vowelsRemoved += strChar;
            }
        }

        return vowelsRemoved;
    }

    // Write in a function that takes in a positive integer, creates a linked list with integers in the range from 1 to
    // the input number and returns a middle element of the linked list if the length of the linked list is an odd
    // number, otherwise -1.
//    public static LinkedList<Integer> todo() {
//
//    }

    // Write a function that creates the right data structure to keep the names of your family members and their age.
    // The function asks the user to type in a family member's name and returns his/her age if the name exists or the
    // string "Such family member does not exist!" if such a member does not exit.
    public static String findFamilyMembersAge() {
        HashMap<String, Integer> members = new HashMap<String, Integer>() {{
            put("Jon", 28);
            put("Jill", 32);
        }};

        Scanner scanner = new Scanner(System.in);

        System.out.println("Which family member's age do you want to find (First name only): ");
        String name = scanner.nextLine();

        if (members.containsKey(name)) {
            return name + " is " + members.get(name) + " years old!";
        }

        return "Such a family member does not exist!";
    }

    // Write a function that takes in a list of countries, swaps the first country with the last one in the list and
    // prints out each of them following the new order. Choose the best collection that gives you access to the first
    // and last element.
    public static void swapFirstAndLastCountry() {
        Deque countries = new LinkedList<String>() {{
            add("USA");
            add("Australia");
            add("Japan");
            add("Germany");
        }};



        System.out.println(countries.peek());
    }
}
