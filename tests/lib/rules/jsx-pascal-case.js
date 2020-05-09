/**
 * @fileoverview Tests for jsx-pascal-case
 * @author Jake Marsh
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/jsx-pascal-case');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('jsx-pascal-case', rule, {
  valid: [{
    // The rule must not warn on components that start with a lowercase
    // because they are interpreted as HTML elements by React
    code: '<testcomponent />'
  }, {
    code: '<testComponent />'
  }, {
    code: '<test_component />'
  }, {
    code: '<TestComponent />'
  }, {
    code: '<CSSTransitionGroup />'
  }, {
    code: '<BetterThanCSS />'
  }, {
    code: '<TestComponent><div /></TestComponent>'
  }, {
    code: '<Test1Component />'
  }, {
    code: '<TestComponent1 />'
  }, {
    code: '<T3StComp0Nent />'
  }, {
    code: '<Éurströmming />'
  }, {
    code: '<Año />'
  }, {
    code: '<Søknad />'
  }, {
    code: '<T />'
  }, {
    code: '<T />',
    parser: parsers.BABEL_ESLINT
  }, {
    code: '<YMCA />',
    options: [{allowAllCaps: true}]
  }, {
    code: '<TEST_COMPONENT />',
    options: [{allowAllCaps: true}]
  }, {
    code: '<Modal.Header />'
  }, {
    code: '<qualification.T3StComp0Nent />'
  }, {
    code: '<__this.TestComponent />'
  }, {
    code: '<$ />'
  }, {
    code: '<_ />'
  }, {
    // The rule must not warn on components with a namespace
    // because this pattern is handled by jsx-no-namespace
    code: '<svg:path />'
  }, {
    code: '<ns:testComponent />'
  }, {
    code: '<Ns:testComponent />'
  }, {
    code: '<__ns:testComponent />'
  }, {
    code: '<ns:TestComponent />'
  }, {
    code: '<Ns:TestComponent />'
  }, {
    code: '<__ns:TestComponent />'
  }, {
    code: '<Modal:Header />'
  }, {
    code: '<layout:Header />'
  }, {
    code: '<IGNORED />',
    options: [{ignore: ['IGNORED']}]
  }],

  invalid: [{
    code: '<Test_component />',
    errors: [{message: 'Imported JSX component Test_component must be in PascalCase'}]
  }, {
    code: '<TEST_COMPONENT />',
    errors: [{message: 'Imported JSX component TEST_COMPONENT must be in PascalCase'}]
  }, {
    code: '<YMCA />',
    errors: [{message: 'Imported JSX component YMCA must be in PascalCase'}]
  }, {
    code: '<$a />',
    errors: [{message: 'Imported JSX component $a must be in PascalCase'}]
  }, {
    code: '<foo.bar />',
    errors: [{message: 'Imported JSX component bar must be in PascalCase'}]
  }, {
    code: '<object.testComponent />',
    errors: [{message: 'Imported JSX component testComponent must be in PascalCase'}]
  }, {
    code: '<Module.testComponent />',
    errors: [{message: 'Imported JSX component testComponent must be in PascalCase'}]
  }, {
    code: '<__this.testComponent />',
    errors: [{message: 'Imported JSX component testComponent must be in PascalCase'}]
  }, {
    code: '<_TEST_COMPONENT />',
    options: [{allowAllCaps: true}],
    errors: [{message: 'Imported JSX component _TEST_COMPONENT must be in PascalCase or SCREAMING_SNAKE_CASE'}]
  }, {
    code: '<TEST_COMPONENT_ />',
    options: [{allowAllCaps: true}],
    errors: [{message: 'Imported JSX component TEST_COMPONENT_ must be in PascalCase or SCREAMING_SNAKE_CASE'}]
  }, {
    code: '<__ />',
    options: [{allowAllCaps: true}],
    errors: [{message: 'Imported JSX component __ must be in PascalCase or SCREAMING_SNAKE_CASE'}]
  }]
});
