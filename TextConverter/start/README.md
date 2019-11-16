In this repository you'll find starting code for five distinct problems. They could be code you inherited from a legacy code-base. Now you want to write unit tests for them, and that is harder than it needs to be. All of the code snippets fail to follow one or more of the SOLID principles.

For each exercise, you should identify which SOLID principles are not being followed by the code. There is only one class you are interested in writing tests for right now. As a first step, try to get some kind of test in place before you change the class at all. If the tests are hard to write, is that because of the problems with SOLID principles?

When you have some kind of test to lean on, refactor the code and make it testable. Take care when refactoring not to alter the functionality, or change interfaces which other client code may rely on. (Imagine there is client code in another repository that you can't see right now). Add more tests to cover the functionality of the particular class you've been asked to get under test.

Apply the unit testing style and framework you are most comfortable with. You can choose to use stubs or mocks or none at all. If you do, you are free to use the mocking tool that you prefer.


2. **UnicodeFileToHtmlTextConverter exercise**: write the unit tests for the UnicodeFileToHtmlTextConverter class. The UnicodeFileToHtmlTextConverter class is designed to reformat a plain text file for display in a browser. For the Python and Java versions, there is an additional class "HtmlPagesConverter" which is slightly harder to get under test. It not only converts text in a file to html, it also supports pagination. It's meant as a follow up exercise.
