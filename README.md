# G-lit

G-lit is a set of components based on lit

## Quick Start

### Import this

Import the js file contained in this repository into the page

```html
<script type="module" src="..."></script>
```

**Note** flag `type="module"`

### Import lit

**Note** the introduction in the js file is corrected (currently lit is in public/core)

## Components

### label-input.js

|propties|type|default|desc|
|---|---|---|---|
|label|string|""|Display the value of label|
|name|string|""|Name of input
|id|string|label|Id of input|
|pla|string|""|Placeholder of input|
|type|string|"text"|Type of input|
|def|string|""|Default value of input|
|value|string|def|Value of input|

label-input.js contains an adaptive input box

### sign-form.js

|propties|type|default|desc|
|---|---|---|---|
|method|string|"post"|Form method|
|reset|boolean|false|Enable reset function|

sign-form.js  contains an easy-to-use  login/registration form and all contents of label-input.js

### nav-layout.js

|propties|type|default|desc|
|---|---|---|---|
|title|string|""|Subtitle|
|set|number|2|Number of options|
|foo|boolean|false|Disable footer|

nav-layout.js contains a default navigation bar, which can contain the footer

ov-effect.js

|propties|type|default|desc|
|---|---|---|---|
|t1|string|"Text I."|first text|
|t2|string|"Text II.."|second text|
|t2|string|"Text III..."|third text|

ov-effect.js contains an adaptive gradient background box, a quick generation of gradient text, and a basic button for gradient border

### search-input.js

|propties|type|default|desc|
|---|---|---|---|
|query|string|""|Index of local query|
|target|string|""|Result location of local query|
|remote|boolean|false|Change sending url to remote|
|infer|boolean|false|Enable inference list from remote|
|action|string|"./"|Form action|
|method|string|"get"|Form method|
|name|string|"q"|Search request name|

search-input.js contains a multi-function search box to obtain content through the page or server or network and an additional web search box
