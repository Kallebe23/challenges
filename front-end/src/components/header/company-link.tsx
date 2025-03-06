"use client";
import { Company } from "@/types/assets";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import CompanyIcon from "@/assets/icons/company.svg";
import { useParams } from "next/navigation";
import { useMemo } from "react";

interface CompanyButtonProps extends LinkProps {
  company: Company;
}

export default function CompanyLink({ company, ...props }: CompanyButtonProps) {
  const { companyId } = useParams<{ companyId: string }>();

  const backgroundColor = useMemo(() => {
    if (companyId === company.id) {
      return "--color-primary";
    }
    return "--color-secondary";
  }, [company, companyId]);

  return (
    <Link {...props}>
      <button
        className="company-link"
        style={{
          backgroundColor: ` var(${backgroundColor})`,
        }}
      >
        <Image src={CompanyIcon} alt="company icon" height={14} />
        {`${company.name} Unit`}
      </button>
    </Link>
  );
}
