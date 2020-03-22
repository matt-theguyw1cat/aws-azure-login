"use strict";

/**
 * Enhances the roleArn list with configurable aliases for roles and accounts
 */

const os = require("os");
const path = require("path");
const fs = require('fs');
const inquirer = require("inquirer");

function getChoiceList(roles) {
    const aliasesFilespec = path.join(os.homedir(), ".aws", "account_aliases.json");
    let account_aliases={};
    if (fs.existsSync(aliasesFilespec)) {
      account_aliases=JSON.parse(fs.readFileSync(aliasesFilespec));
    }
    var raw_choices=[];

    for (var i=0; i<roles.length; i++) {
        let accountId=roles[i].roleArn.split(':')[4];
        let roleName=roles[i].roleArn.split('/')[1];
        if (accountId in account_aliases) {
            accountId=account_aliases[accountId];
        }
        let choice_name=roleName  + "@" + accountId;
        raw_choices.push({ "name": choice_name, "value": roles[i].roleArn });
    }
    
    raw_choices.sort(function(a,b) {
      return  a.name.localeCompare(b.name);
    });

    var choices=[]
    var lastRoleName=null;    
    var separators=0;
    for (var i=0; i<raw_choices.length; i++) {
        let roleName=raw_choices[i].value.split('/')[1];
        if ( lastRoleName != null && lastRoleName != roleName) {
            choices.push(new inquirer.Separator());
            separators+=1;
        }
        choices.push(raw_choices[i]);
        lastRoleName=roleName;
    }
    if ( separators > 0 ) {
        choices.push(new inquirer.Separator());
    }
    return choices;
    
};

function testChoiceList() {
    console.log(getChoiceList([ 
  { roleArn: 'arn:aws:iam::699071200452:role/corp-admin',
    principalArn: 'arn:aws:iam::699071200452:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::278645169579:role/corp-admin',
    principalArn: 'arn:aws:iam::278645169579:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::278645169579:role/corp-devops',
    principalArn: 'arn:aws:iam::278645169579:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::168722687966:role/app-developer',
    principalArn: 'arn:aws:iam::168722687966:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::168722687966:role/corp-admin',
    principalArn: 'arn:aws:iam::168722687966:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::168722687966:role/corp-devops',
    principalArn: 'arn:aws:iam::168722687966:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::168722687966:role/corp-iam-admin',
    principalArn: 'arn:aws:iam::168722687966:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::168722687966:role/corp-soc',
    principalArn: 'arn:aws:iam::168722687966:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::211439235829:role/corp-admin',
    principalArn: 'arn:aws:iam::211439235829:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::211439235829:role/corp-devops',
    principalArn: 'arn:aws:iam::211439235829:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::211439235829:role/corp-iam-admin',
    principalArn: 'arn:aws:iam::211439235829:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::211439235829:role/corp-soc',
    principalArn: 'arn:aws:iam::211439235829:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::693396327804:role/app-developer',
    principalArn: 'arn:aws:iam::693396327804:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::693396327804:role/corp-admin',
    principalArn: 'arn:aws:iam::693396327804:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::279397911520:role/app-developer',
    principalArn: 'arn:aws:iam::279397911520:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::279397911520:role/corp-admin',
    principalArn: 'arn:aws:iam::279397911520:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::279397911520:role/corp-devops',
    principalArn: 'arn:aws:iam::279397911520:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::075841858264:role/app-developer',
    principalArn: 'arn:aws:iam::075841858264:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::415816384163:role/corp-admin',
    principalArn: 'arn:aws:iam::415816384163:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::415816384163:role/corp-devops',
    principalArn: 'arn:aws:iam::415816384163:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::950463183645:role/app-developer',
    principalArn: 'arn:aws:iam::950463183645:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::876837051053:role/corp-devops',
    principalArn: 'arn:aws:iam::876837051053:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::009136774301:role/cloud-pioneer',
    principalArn: 'arn:aws:iam::009136774301:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::592706360732:role/app-developer',
    principalArn: 'arn:aws:iam::592706360732:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::592706360732:role/corp-admin',
    principalArn: 'arn:aws:iam::592706360732:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::364161771924:role/app-developer',
    principalArn: 'arn:aws:iam::364161771924:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::961194864584:role/corp-admin',
    principalArn: 'arn:aws:iam::961194864584:saml-provider/WAAD' },
  { roleArn: 'arn:aws:iam::961194864584:role/corp-devops',
    principalArn: 'arn:aws:iam::961194864584:saml-provider/WAAD' }
  ]));
};


exports.getChoiceList = getChoiceList;
exports.testChoiceList = testChoiceList;
