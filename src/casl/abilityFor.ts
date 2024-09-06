// casl.js
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import React from 'react';

export const AbilityContext = React.createContext<string | null|any>(null);
export const Can  = createContextualCan(AbilityContext.Consumer);

const defineAbilitiesFor = (role:string) => {
  const { can,cannot, build } = new AbilityBuilder(createMongoAbility);
  if(role==='admin'){
    can('manage', 'all')
  }else if(role==='user'){
    can('read', 'post'); 
  }else{
    cannot('read','post')
  }
 
   
  return build()
};

export const ability = defineAbilitiesFor();

export default defineAbilitiesFor;
