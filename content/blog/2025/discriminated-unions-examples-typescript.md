---
title: Ten Common Typescript Discriminated Union Examples 
author: chris
type: post
date: 2025-02-8 07:07:00+00:00
url: /2025/discriminated-unions-examples-typescript/
redirect_from: 
  - /discriminated-unions-examples-typescript/
featured_image: /blog/rick-mason-lego-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/fr/@brett_jordan">Brett Jordan</a>
tags: [typescript, development]
api: ['interface', 'type', 'union', 'typescript' ]
draft: false
---
In this post we explore the marvelous world of Discriminated Unions in TypeScript. 

_Discriminated Unions_ are a way to combine types that have a common discriminant (usually a literal property) so that TypeScript can narrow down which type it’s dealing with. Let’s explore the 10 patterns that make these unions your coding sidekick!

If you're like me that learn better with sample code, then I won't go into explaining what Discriminated Unions anymore and let's get straight to some examples. 

## 1. Basic Discriminated Union
```typescript

	type Circle = { kind: "circle"; radius: number };
	type Square = { kind: "square"; side: number };
	type Shape = Circle | Square;
	
	function getArea(shape: Shape): number {
	  switch (shape.kind) {
	    case "circle":
	      return Math.PI * shape.radius ** 2;
	    case "square":
	      return shape.side * shape.side;
	  }
	}

```
*This pattern shows the simple yet powerful use of a common property (`kind`) to determine how to process each shape.  This is most common pattern on when to use Discriminated Unions. When your object has a common property that helps "discriminate" the "shape" of the object. Other common properties used are "type", "status", "responseType" etc.*


## 2.  Exhaustiveness Checking
```typescript

	function assertNever(x: never): never {
	  throw new Error("Unexpected object: " + x);
	}
	
	function getArea(shape: Shape): number {
	  switch (shape.kind) {
	    case "circle":
	      return Math.PI * shape.radius ** 2;
	    case "square":
	      return shape.side ** 2;
	    default:
	      return assertNever(shape); // Compiler will remind you if a new type is forgotten.
	  }
	}

```
*This example  ensures every case is handled, it introduces a function that throws an exception if you introduced one you have not defined. Use this pattern to safeguard agains "oops" moments. 


## 3. Handling Different API Responses
```typescript

	type APISuccess = { kind: "success"; data: any };
	type APIError = { kind: "error"; errorCode: number; message: string };
	type APIResponse = APISuccess | APIError;
	
	function handleResponse(response: APIResponse): string {
	  switch (response.kind) {
	    case "success":
	      return "Data: " + JSON.stringify(response.data);
	    case "error":
	      return `Error ${response.errorCode}: ${response.message}`;
	  }
	}

```
*By using a discriminant (`kind`), this pattern cleanly separates successful responses from errors. Imagine it as the Avengers assembling to tackle any API threat—each with its own special move!*

## 4. Handling Success and Failure
```typescript

	//...
	
	type Success<T> = { status: "success"; data: T };
	type Failure = { status: "failure"; error: string };
	type Result<T> = Success<T> | Failure;
	
	interface ChatResponse extends ApiResponse {}
	
	function MyComponent(props: Readonly<IMyComponentProps>) {
		const [result, setResult] = useState<Result<ChatResponse>>({});
		
		function fetchData(): void {
		  // Simulating an API call ...
		}
		
		function handleFetchResult(response: Result<ChatResponse>) {		
			setResult({...response});
		}
		
		if (result.status === "success") {
		    return <SuccessfulFetchView data={result.data} />;
		}
		
		return <FailedFetchView error={result.error} />;
	}

```
*Here we use Discriminated Unions to elegantly handle both success and error outcomes and render the appropriate view. 

## 5. Representing UI States
```typescript

	type LoadingState = { status: "loading" };
	type LoadedState<T> = { status: "loaded"; data: T };
	type ErrorState = { status: "error"; message: string };
	
	type UIState<T> = LoadingState | LoadedState<T> | ErrorState;
	
	function getMessageText<T>(state: UIState<T>): string {
	  switch (state.status) {
	    case "loading":
	      return "Loading...";
	    case "loaded":
	      return `Data: ${JSON.stringify(state.data)}`;
	    case "error":
	      return `Error: ${state.message}`;
	  }
	}
```
*This pattern leverages discriminated unions to manage different UI states. It’s like switching between your favorite streaming channels—each state brings a different vibe to the screen!*

## 6. Navigating Nested Data Structures
```typescript

	type TreeNode = { type: "node"; value: number; children: TreeNode[] };
	type LeafNode = { type: "leaf"; value: number };
	
	type Tree = TreeNode | LeafNode;
	
	function sumTree(tree: Tree): number {
	  if (tree.type === "leaf") {
	    return tree.value;
	  } else {
	    return tree.value + tree.children.reduce((sum, child) => sum + sumTree(child), 0);
	  }
	}

```
*This pattern shows how discriminated unions can power recursive data structures, like summing values in a tree. It’s your code’s version of a nested Russian doll, but with fewer existential crises!*

---

## 7.  Managing Different Events
```typescript

	type ClickEvent = { type: "click"; x: number; y: number };
	type KeyPressEvent = { type: "keypress"; key: string };
	type Event = ClickEvent | KeyPressEvent;
	
	function handleEvent(event: Event): void {
	  switch (event.type) {
	    case "click":
	      console.log(`Clicked at (${event.x}, ${event.y})`);
	      break;
	    case "keypress":
	      console.log(`Key pressed: ${event.key}`);
	      break;
	  }
	}

```
*Discriminated unions here allow you to handle different events with precision. It’s like having a remote control that instantly switches channels—only, in this case, you’re switching event handlers!*

---

## 8. Representing Validation States
```typescript

	type ValidForm = { status: "valid"; values: Record<string, any> };
	type InvalidForm = { status: "invalid"; errors: Record<string, string> };
	
	type FormState = ValidForm | InvalidForm;
	
	function processForm(state: FormState): string {
	  switch (state.status) {
	    case "valid":
	      return "Processing form with values: " + JSON.stringify(state.values);
	    case "invalid":
	      return "Errors: " + JSON.stringify(state.errors);
	  }
	}

```
*This pattern utilizes discriminated unions to clearly represent whether a form is valid or not. It’s like having a Hogwarts sorting hat that instantly tells you if your form is magical (valid) or a muggle (invalid)!*

---

## 9. Handling Multiple Plugin Types
```typescript

	interface BasePlugin {
	  type: string;
	}
	
	interface LoggerPlugin extends BasePlugin {
	  type: "logger";
	  logLevel: "debug" | "info" | "warn" | "error";
	}
	
	interface AuthPlugin extends BasePlugin {
	  type: "auth";
	  provider: string;
	}
	
	type Plugin = LoggerPlugin | AuthPlugin;
	
	function initializePlugin(plugin: Plugin): void {
	  switch (plugin.type) {
	    case "logger":
	      logger.write(`Logger initialized with level ${plugin.logLevel}`);
	    case "auth":
	      logger.write(`Auth plugin using ${plugin.provider}`);
	  }
	}

```
*Here, discriminated unions help manage various plugin types within an architecture. Think of it as assembling your own tech-savvy Justice League where every plugin has a specific role to play!*

---

## 10. Streamlining Command Execution
```typescript

	type CreateCommand = { type: "create"; payload: User };
	type UpdateCommand = { type: "update"; id: number; payload: User };
	type DeleteCommand = { type: "delete"; id: number };
	
	type Command = CreateCommand | UpdateCommand | DeleteCommand;
	
	function execute(command: Command): DbResponse {
	  switch (command.type) {
	    case "create":
	      return db.query(sql, {payload: data.payload }); 
	    case "update":
	      return db.query(sql, {id: data.id, payload: data.payload }); 	
	    case "delete":
	      return db.query(sql, {id: data.id}); 	
	  }
	}

```
*In this pattern, discriminated unions simplify the handling of different commands, ensuring that each command is executed correctly. It’s akin to having a Swiss Army knife of commands, ready to take on any task with precision! *

---

## When to use Discrimated Unions

```pgsql

                            ┌───────────────────────────────────┐
                            │ Do you have multiple related     │
                            │ types that share common fields?  │
                            └───────────────────────────────────┘
                                           │
                     Yes                   ▼                   No
                      ─────────────────► ┌───────────────────┐ ──────► Consider other patterns
                                         │ Do the types have │
                                         │ a clear "kind" or │
                                         │ "type" discriminator? │
                                         └───────────────────┘
                                           │
                     Yes                   ▼                   No
                      ─────────────────► ┌───────────────────┐ ──────► Use Union Types without
                                         │ Do you need type  │        discriminators or Interfaces
                                         │ safety in switch  │
                                         │ or if-else checks?│
                                         └───────────────────┘
                                           │
                     Yes                   ▼                   No
                      ─────────────────► ┌───────────────────┐ ──────► Consider simple types
                                         │ Use Discriminated │
                                         │ Unions for better │
                                         │ type safety       │
                                         └───────────────────┘


```

If you said yes to all the questions then use a Discriminated Union. If you said no to one of the questions, maybe you need to think of a different pattern. 

# Wrap-Up

Discriminated unions is another Typescript feature to help you write robust, maintainable code. By clearly defining each possible state or variant, you can avoid runtime errors and make your code self-documenting, just like a well-curated 80's playlist. As you experiment with these patterns, explore further resources like the [TypeScript Handbook on Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) and [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) to continue your journey. 

Happy coding!