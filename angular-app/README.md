# AngularApp

This project was generated with angular version 16.1.6.
This project helps to visualize the accidents on aircraft happening over a particular year. This application includes markers on the world map all over the globe. Below is the solution design:

1. All business logic is a part of backend system. Frontend contains no business logic.
2. There are two APIs as below which mainly serves the data to the app
    1. /years -> This API looks into the datasheet and collects all the years when incidents have occurred. This is preferred over standard brute force year picker is to avoid extra clicking by the user.
    2. /query?year={year} -> This API looks into the datasheet and returns all the data points for that particular. This data is used to add markers on the map.
3. While analysing the data, there are few points which has been left out of scope
    1. There are datapoints where lat, lon information is not available. Although there were ways to retrieve this information based on the location and use a googleapi to retrieve the lat and lon. Although for cases when the country was also missing and there were datapoints which were either waterbodies or border, centered location could have been identified. But considering the time, I had, I chose to work with the usecase where we have datapoints with coordinates.
4. Decent error handling has been added
5. Since the code was pretty small and there was no routing logic required, lazy loading of modules was opted out. Else the most obvious choice would have been to lazy load the dependent modules.
6. Kindly note that the package size is above the budgets and that has to do with the images being locally stored in the assets. In ideal situation, images, icons and fonts should be referred from a shared component library with absolute hrefs.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Solution Design

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
