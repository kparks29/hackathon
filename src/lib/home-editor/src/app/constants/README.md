HomeEditor.Constants Module
===========================

This module defines the globally-accessible constants for the HomeEditor app.

The naming convention for constants are ALL CAPS.

Why not have one file that contains the constant module?
--------------------------------------------------------

Storing many constants in one file can get disorganized, especially if some constants
are defined through some conditional logic that may involve other constants. 

Separating constants into their own file makes it easier to find and focus on how a particular constant
is being defined.


Why is ApiUrl a service?
------------------------

Because it's a globally-accessible constant whose value depends on another constant, in this case
RUNTIME_ENVIRONMENT. Constants that have dependencies are defined as services since angular constants
don't have dependencies.


You have a test for a constant?
-------------------------------

Any constant whose definition involves conditional logic should be tested to make sure the logic is working
correctly.