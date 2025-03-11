
import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast as useToastOriginal } from "@/components/ui/use-toast"

// Re-export the useToast hook from the ui/use-toast file
export const useToast = useToastOriginal;

export const toast = useToastOriginal().toast;
