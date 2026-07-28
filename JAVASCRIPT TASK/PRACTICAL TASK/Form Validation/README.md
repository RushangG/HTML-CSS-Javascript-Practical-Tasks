# Dynamic Form Validation Task

A modern web form featuring real-time, dynamic input validation. The user interface provides immediate color-coded visual feedback and context messages as users type, ensuring all criteria are satisfied before allowing submission.

---

## Functional Requirements

### 1. User Interface Structure

- **Form Fields:** Four core components—Name, Email, Password, and Confirm Password.
- **Validation Messages:** Interactive tracking text strings mounted beneath each field.
- **Submit Button:** Remains locked in a `disabled` state until every validation rule passes.

### 2. Validation Rule Criteria

#### Name Field

- Must contain a minimum of 3 characters.
- Restricts numeric digits or special symbol characters entirely.

#### Email Field

- Must strictly comply with standard structural address rules (`user@example.com`).

#### Password Field

- Must contain a minimum of 8 characters.
- Must include at least 1 uppercase letter.
- Must include at least 1 lowercase letter.
- Must include at least 1 numeric digit.
- Must include at least 1 special structural character.

#### Confirm Password Field

- Must verify exact equivalence matching against the active contents of the primary Password field.

### Application Workflow Architecture

- **Real-Time Validation Logic:** Evaluates text configurations instantly on every keystroke.
- **Submit Management Handler:** Prevents execution loops if field metrics fail, displaying a final success banner upon clear validation.

# How to Use

1. add valid User name ( 3 or more characters, no numbers or special characters)

2. add valid Email ( must be in the format user@example.com)

3. add valid Password ( must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character)

4. add valid Confirm Password ( must match the Password field exactly)

Click the "Submit" button to complete the form submission once all fields are valid.

### Store User data in local storage and display a success message upon successful submission.
