# 1. Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>
```

<script setup>
import { useData } from 'vitepress'
import Dailog from './Dailog.vue'

const { site, theme, page, frontmatter } = useData()
</script>

<Dailog />

## 1.1. Results

### 1.1.1. Theme Data

```json-vue
{{ theme }}
```

### 1.1.2. Page Data

```json-vue
{{ page }}
```

### 1.1.3. Page Frontmatter

```json-vue
{{ frontmatter }}
```

## 1.2. More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).

## markdown includes

<!--@include: ./markdown.md-->

<!--@include: https://github.com/GroupOfStar/mini-compiler/blob/master/README.md?plain=1-->
