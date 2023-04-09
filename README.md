
## Tech Stack

* React,
* CSS Modules,
* Reactflow
* React-Paginate,
* React-router,
* Dayjs

## Workflow list page
![image](https://user-images.githubusercontent.com/97614113/230796562-f295e7a0-5232-4143-b180-6d91c8b24c26.png)

* This page lists the Name, Input type and creation date.
* On clicking to any of the lists the user is redirected to the Workflow design page where one can work on canvas

## Workflow designer page
<img width="960" alt="image" src="https://user-images.githubusercontent.com/97614113/230796669-2b1d34a3-ba5d-4827-ae23-1f81ea84895c.png">

* It has Workflow name at the top.
* A input node with same input type as mentioned in the workflow list.
* It lists a total of 99 modules with 5 modules in each page.
* The bottom of modules section has the pagination to navigate between the pages.
* User can drag and drop the modules into the canvas.
* Users acan delete nodes in the canvas by pressing backspave keys.
* Each module has input type (on their left), output type(on their right) and a name.
* The edges are removable and updatable, i.e., they can be removed or the target can be changed


<img width="960" alt="image" src="https://user-images.githubusercontent.com/97614113/230796964-2e865407-fd48-4156-b81e-4dc73df18ee6.png">
<img width="957" alt="image" src="https://user-images.githubusercontent.com/97614113/230797013-d3fe6859-5a7e-40be-bffa-f8383ad89e56.png">

* Modules in the canvas have valid and invalid states. Module is invalid it has no input edge and it is valid if it has input edge.
* Invalid nodes are marked with red border.
* This does not apply to the input node, input node is always valid

