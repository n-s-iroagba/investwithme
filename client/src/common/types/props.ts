import React from "react";
export interface ManagerCardProps{
  firstName: string;
    lastName: string;
    duration: number|string;
    qualification: string;
    minimumInvestmentAmount:number|string;
    percentageYield: number|string; 
    button: React.ReactNode,
    deleteButton?: React.ReactNode;
    image:  any;
  }
  