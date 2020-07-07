# Baby Names React SPA

## TODO - Core Requirements

~~1. Upon first visit, Users should default to working on a new distinct list~~  
~~2. A user’s list should have an ID (alphanumeric 12-character string) that uniquely identifies it~~  
~~3. The URL upon first visit should include (?list_id=) and the auto-generated list_id~~  
~~4. If a user goes to “/” they should be redirected to “/?list_id=xxxxxxxxxx” (a new list)~~  
~~5. Users can return to a list by visiting a URL with their distinct list_id parameter~~  
~~6. Users should be able to add as many names as they would like in a list~~  
~~7. Whitespace should be trimmed from both ends of the submitted names~~  
~~8. Duplicate names (case-insensitive, per-list) should be prevented and result in appropriate error messaging to the user~~  
~~9. Use PostgreSQL for your database engine~~  
~~10. SPA is fully static and implemented using ReactJS~~  

Core Requirements: Met

## TODO - Stretch Goals

~~1. Use Redux state management for the UI~~  
~~2. Clicking on a name crosses it out (and clicking again un-crosses it out). This crossed-out state should persist across sessions and between users viewing  the same list.~~  
~~3. Only allow names with letters and (at most) one space. ○ Good:  ‘Sally Lou’, ’Stanley’, ‘JoeBob Pringles’ ○ Bad: ‘C3P0’, ’Stan the Man’~~  
        Note: Half done, still able to have triple plus names  
~~4. Real-time updates when multiple people are working on the same list~~  
        Note: might be done, difficult to test currently  
5. Allow the user to manually prioritize the list using drag-and-drop functionality  
6. Client-side sorting of names (Alphabetical, By Input Time, By Length)  

Stretch Goals: Mostly done
