# {%= name %} {%= badge('fury') %}

> {%= description %}

## Install
{%= include("install-global") %}

## Usage
Now that <%= projectname %> is installed globally, run `<%= projectname %>` to use the CLI.

If you want to take it for a test run, copy/paste this into the command line:

```bash
<%= projectname %> todo.md "Create my own CLI!"
```

To add another task, just follow the same format: `<%= projectname %> [file] [task]`

Or, use these command line arguments:

* `-f`| `--file` specify the file you want to create or append. If no source file is explicitly passed, then `TODO.md` will be created/appended.
* `-t`| `--task` the task you'd like to add to the specified file

Example: `<%= projectname %> -t "Write more documentation"`

## Author

**<%= authorname %>**

* [github/<%= authorurl %>](https://github.com/<%= authorurl %>)
* [twitter/<%= authorurl %>](http://twitter.com/<%= authorurl %>)

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}
