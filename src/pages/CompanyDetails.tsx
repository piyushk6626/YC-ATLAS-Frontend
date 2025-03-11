
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CompanyDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Viewing details for company with ID: {id}</p>
          <p className="mt-4 text-muted-foreground">
            This is a placeholder page. In a real application, this would display 
            detailed information about the selected company.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetails;
