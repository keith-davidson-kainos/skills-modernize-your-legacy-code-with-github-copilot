# Test Plan for COBOL Student Account Management System

This test plan covers the business logic and functionality of the legacy COBOL student account management system. It is designed to validate the system's behavior with business stakeholders and will serve as a foundation for creating unit and integration tests in the Node.js modernization.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC001 | View initial balance | Application is running, no prior transactions | 1. Start the application<br>2. Select option 1 (View Balance) | Display "Current balance: 1000.00" |  |  | Initial balance is $1000.00 |
| TC002 | Credit account with positive amount | Application is running, balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 500.00<br>3. Select option 1 to view balance | Display "Amount credited. New balance: 1500.00" then "Current balance: 1500.00" |  |  | Balance increases by credited amount |
| TC003 | Debit account with sufficient funds | Application is running, balance is 1500.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 200.00<br>3. Select option 1 to view balance | Display "Amount debited. New balance: 1300.00" then "Current balance: 1300.00" |  |  | Balance decreases by debited amount |
| TC004 | Debit account with insufficient funds | Application is running, balance is 1300.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 1500.00 | Display "Insufficient funds for this debit." and balance remains 1300.00 |  |  | No overdraft allowed |
| TC005 | Multiple credit operations | Application is running, balance is 1300.00 | 1. Select option 2, enter 100.00<br>2. Select option 2, enter 50.00<br>3. Select option 1 to view balance | Balance becomes 1450.00 |  |  | Persistence of balance across operations |
| TC006 | Multiple debit operations | Application is running, balance is 1450.00 | 1. Select option 3, enter 100.00<br>2. Select option 3, enter 50.00<br>3. Select option 1 to view balance | Balance becomes 1300.00 |  |  | Persistence and validation across debits |
| TC007 | Credit followed by debit | Application is running, balance is 1300.00 | 1. Select option 2, enter 300.00<br>2. Select option 3, enter 400.00<br>3. Select option 1 to view balance | Balance becomes 1200.00 |  |  | Sequential operations maintain correct balance |
| TC008 | Debit exact balance | Application is running, balance is 1200.00 | 1. Select option 3, enter 1200.00<br>2. Select option 1 to view balance | Balance becomes 0.00 |  |  | Allow debit of entire balance |
| TC009 | Attempt debit after zero balance | Application is running, balance is 0.00 | 1. Select option 3, enter 100.00 | Display "Insufficient funds for this debit." |  |  | Prevent negative balance |
| TC010 | Exit application | Application is running | 1. Select option 4 (Exit) | Display "Exiting the program. Goodbye!" and terminate |  |  | Clean exit |
| TC011 | Invalid menu choice | Application is running | 1. Enter invalid choice (e.g., 5) | Display "Invalid choice, please select 1-4." and show menu again |  |  | Input validation for menu |
| TC012 | Credit with zero amount | Application is running, balance is 1000.00 | 1. Select option 2<br>2. Enter amount: 0.00<br>3. Select option 1 | Balance remains 1000.00 |  |  | Edge case: zero credit |
| TC013 | Debit with zero amount | Application is running, balance is 1000.00 | 1. Select option 3<br>2. Enter amount: 0.00<br>3. Select option 1 | Balance remains 1000.00 |  |  | Edge case: zero debit (should succeed) |

## Test Execution Notes
- All monetary values are in USD with 2 decimal places
- The system uses a shared balance across the application session
- Balance persistence is maintained through the DataProgram module
- Tests should be executed in sequence where dependencies exist (e.g., TC002 before TC003)
- Actual Result, Status, and Comments columns should be filled during test execution