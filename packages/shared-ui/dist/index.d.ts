import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import { ClassValue } from 'clsx';

interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline";
}
declare function Button({ variant, className, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

declare function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>): react_jsx_runtime.JSX.Element;
declare function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>): react_jsx_runtime.JSX.Element;
declare function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>): react_jsx_runtime.JSX.Element;
declare function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>): react_jsx_runtime.JSX.Element;
declare function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>): react_jsx_runtime.JSX.Element;
declare function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>): react_jsx_runtime.JSX.Element;

declare function Input({ className, type, ...props }: React.ComponentProps<"input">): react_jsx_runtime.JSX.Element;

interface BadgeProps {
    status: "active" | "inactive";
}
declare function Badge({ status }: BadgeProps): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { Badge, Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, cn };
